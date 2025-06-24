package com.EFP.EFP_Video_Dashboard_Backend.controller;

import com.EFP.EFP_Video_Dashboard_Backend.ErrorHandller.ConfirmationRequiredException;
import com.EFP.EFP_Video_Dashboard_Backend.dao.UserRepository;
import com.EFP.EFP_Video_Dashboard_Backend.dto.UserDTO;
import com.EFP.EFP_Video_Dashboard_Backend.models.UserModel;
import com.EFP.EFP_Video_Dashboard_Backend.services.AuthService;
import com.EFP.EFP_Video_Dashboard_Backend.services.MailService;
import com.EFP.EFP_Video_Dashboard_Backend.services.UserService;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Collection;
import java.util.Collections;
import java.util.Map;
import java.util.stream.Collectors;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;


@RestController
@RequestMapping("/api/v1/user")
@Slf4j
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthService authService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    MailService mailService;


    @PostMapping("/signup")
    public ResponseEntity<Map<String, Boolean>> signup(@RequestBody final UserDTO pDTO) throws IOException {
        log.warn("UserController -- signup -- {}",pDTO);
        val user = userRepository.findByEmail(pDTO.getEmail());
        if (user != null) {
            if (!user.getEnabled()) {
                val userDto = UserDTO.of(user);
                val validationURL = mailService.buildValidationURL(userDto);
                mailService.sendConfirmationEmail(userDto.getEmail(), userDto.getFirst_name(), validationURL);
                return ResponseEntity.ok().body(Collections.singletonMap("response", true));
            }
            return ResponseEntity.ok().body(Collections.singletonMap("response", false));
        }
        val result = authService.createSubscriber(pDTO);
        val validationURL = mailService.buildValidationURL(result);
        mailService.sendConfirmationEmail(result.getEmail(),result.getFirst_name(),validationURL);
        return ResponseEntity.ok().body(Collections.singletonMap("response", true));
    }

    @PostMapping(value = "/login", produces = APPLICATION_JSON_VALUE)
    public Map<String, String> login(@RequestBody final UserDTO pDTO) throws IOException, ConfirmationRequiredException {
        log.warn("UserController -- login -- {}",pDTO);
        return Collections.singletonMap("access_token", authService.login(pDTO));
    }

    @GetMapping("/get_details")
    public UserModel getDetails(@RequestBody final UserDTO pDTO){
        log.warn("UserController -- get_details -- {}",pDTO);
        return userService.getUser(pDTO.getEmail());
    }

    @GetMapping("/get_details/{email}")
    public UserDTO getUserDetails(@PathVariable("email") String email){
        log.warn("UserController -- get_details -- {}",email);
        val user = userRepository.findByEmail(email);
        user.setUserPassword("");
        return UserDTO.of(user);
    }

    @GetMapping("/users")
    public Collection<UserDTO> userGet(){
        return userRepository.getAllByDtmDeletedIsNullOrderByFirstName().stream()
                .map(UserDTO::of)
                .collect(Collectors.toList());
    }

    @GetMapping("/delete_user/{id}")
    public ResponseEntity<Map<String, Boolean>> DeleteUser(@PathVariable("id") int id){
        try {
            val model = userRepository.getById(id);
            authService.DeleteUser(model);
            return ResponseEntity.ok().body(Collections.singletonMap("response", true));
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(Collections.singletonMap("response", true));
        }

    }

    @GetMapping("/forgot_password")
    public ResponseEntity<Map<String, Boolean>> forgot_password(@RequestBody final UserDTO pDTO) throws IOException {
        log.warn("UserController -- forgotpassword -- {}",pDTO);
        val user = userRepository.findByEmail(pDTO.getEmail());
        if (user != null) {
            if (user.getEnabled()) {
                val userDto = UserDTO.of(user);
                val validationURL = mailService.buildValidationURL(userDto);
                mailService.sendConfirmationEmail(userDto.getEmail(), userDto.getFirst_name(), validationURL);
                return ResponseEntity.ok().body(Collections.singletonMap("response", true));
            }
            return ResponseEntity.ok().body(Collections.singletonMap("response", false));
        }
        val result = authService.createSubscriber(pDTO);
        val validationURL = mailService.buildValidationURL(result);
        mailService.sendConfirmationEmail(result.getEmail(),result.getFirst_name(),validationURL);
        return ResponseEntity.ok().body(Collections.singletonMap("response", true));
    }



}
