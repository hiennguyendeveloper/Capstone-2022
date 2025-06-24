package com.EFP.EFP_Video_Dashboard_Backend.services;


import com.EFP.EFP_Video_Dashboard_Backend.ErrorHandller.ConfirmationRequiredException;
import com.EFP.EFP_Video_Dashboard_Backend.dao.RoleRepository;
import com.EFP.EFP_Video_Dashboard_Backend.dao.StatusRepository;
import com.EFP.EFP_Video_Dashboard_Backend.dao.UserRepository;
import com.EFP.EFP_Video_Dashboard_Backend.dto.UserDTO;
import com.EFP.EFP_Video_Dashboard_Backend.models.LessonModel;
import com.EFP.EFP_Video_Dashboard_Backend.models.UserModel;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private StatusRepository statusRepository;

    @Autowired
    private MailService mailService;

    public UserDTO createSubscriber(final UserDTO pDTO){
        try {
            log.warn("AuthService -- createSubscriber -- preEdit{}",pDTO);
            pDTO.setDtm_created(LocalDate.from(LocalDateTime.now()));
            pDTO.setDtm_updated(LocalDate.from(LocalDateTime.now()));
            val yy = pDTO.getPassword();
            pDTO.setPassword(passwordEncoder.encode(yy));
            log.warn("AuthService -- createSubscriber -- postEdit{}",pDTO);

            val model = pDTO.toModelCreateSubSubscriber(Integer.MIN_VALUE);
            model.setUserRole(roleRepository.getById(4));
            model.setProgress(0);
            model.setStatus(statusRepository.getById(2));
            log.warn("AuthService -- createSubscriber -- pre-model {}",model);
            userRepository.save(model);

            val uDTO = UserDTO.of(model);
            uDTO.setRole(model.getUserRole());
            log.warn("AuthService -- createSubscriber -- Saved model{}",model);
            uDTO.setId(model.getId());
            return uDTO;
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A user with that email already exist! {}",e);
        }
    }

    public String login(final UserDTO pDTO) throws IOException, ConfirmationRequiredException {
        log.warn("AuthService -- login -- premodel{}",pDTO);

        val model = userRepository.findByEmail(pDTO.getEmail());
        if (model == null)
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"This email and password combination does not exist");

        if (!model.getEnabled()){
            val userDto = UserDTO.of(model);
            val validationURL = mailService.buildValidationURL(userDto);
            mailService.sendConfirmationEmail(userDto.getEmail(), userDto.getFirst_name(), validationURL);
            throw new ConfirmationRequiredException(HttpStatus.NOT_FOUND,"This account is not confirmed please check your email");
        }
        log.warn("AuthService -- login -- model{}",model);

        if (!passwordEncoder.matches(pDTO.getPassword(), model.getUserPassword())) {
            log.warn("AuthService -- login -- no model{}",model);
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"This email and password combination does not exist");
        }

        //update last login
        log.warn("AuthService -- login -- update last login{}",model);
        model.setDtmLastLogin(LocalDateTime.from(LocalDateTime.now().atZone(ZoneId.systemDefault())));
        userRepository.save(model);
        log.warn("AuthService -- login -- post update last login{}",model);

        return forge(pDTO);
    }



    public String forge(final UserDTO pDTO){
        try {
            log.warn("AuthService -- forge -- preAuth{}",pDTO);

            UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(pDTO.getEmail(),pDTO.getPassword());
            val authentication = authenticationManager.authenticate(usernamePasswordAuthenticationToken);
            log.warn("AuthService -- forge -- postAuth{}",authentication);
            User user = (User) authentication.getPrincipal();
            Algorithm algorithm = Algorithm.HMAC256("1zirfq!$61q7)uwtxxsqm($66@9)+64ptjaz8-9w_)-_w4xtx5-ogk%pd2u(uwv-iw#*qkd-af!ns1piocl_6n7k!#873#bwl@lc".getBytes(StandardCharsets.UTF_8));
            log.warn("AuthService -- forge -- postUser{}",user);

            String access_token = JWT.create()
                    //10 minutes
                    .withExpiresAt(Date.from(LocalDateTime.now().plusHours(4L).atZone(ZoneId.systemDefault()).toInstant()))
//                    .withIssuer(properties.getBaseURL())
                    .withIssuer("https://app.escapefrompoverty.org")
                    .withClaim("role",user.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
                    .sign(algorithm);

            log.warn("AuthService -- forge -- access_token{}",access_token);
            return access_token;
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Jwt Token creation failed");
        }




    }


    public void DeleteUser(UserModel user){
        user.setDtmDeleted(LocalDateTime.now());
        userRepository.save(user);
    }



}
