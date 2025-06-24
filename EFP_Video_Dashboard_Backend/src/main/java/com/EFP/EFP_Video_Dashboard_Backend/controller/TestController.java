package com.EFP.EFP_Video_Dashboard_Backend.controller;


import com.EFP.EFP_Video_Dashboard_Backend.dao.RoleRepository;
import com.EFP.EFP_Video_Dashboard_Backend.dao.StatusRepository;
import com.EFP.EFP_Video_Dashboard_Backend.dto.RoleDTO;
import com.EFP.EFP_Video_Dashboard_Backend.dto.StatusDTO;
import com.EFP.EFP_Video_Dashboard_Backend.dto.UserDTO;
import com.EFP.EFP_Video_Dashboard_Backend.models.UserModel;
import com.EFP.EFP_Video_Dashboard_Backend.services.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Collection;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/test")
@Slf4j
@RequiredArgsConstructor
public class TestController {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private StatusRepository statusRepository;

    @Autowired
    private UserService userService;

    @GetMapping("/roles")
    public Collection<RoleDTO> roleGet(){
       return roleRepository.findAll().stream()
               .map(RoleDTO::of)
               .collect(Collectors.toList());
    }

    @GetMapping("/status")
    public Collection<StatusDTO> statusGet(){
        return statusRepository.findAll().stream()
                .map(StatusDTO::of)
                .collect(Collectors.toList());
    }

    @PutMapping("/putuser/")
    public UserDTO create(@RequestBody final UserDTO pUser){
        val model = pUser.toModel(Integer.MIN_VALUE);
        model.setDtmCreated(LocalDate.from(LocalDateTime.now().plusMinutes(10L).atZone(ZoneId.systemDefault()).toInstant()));
        model.setDtmUpdated(LocalDate.from(LocalDateTime.now().plusMinutes(10L).atZone(ZoneId.systemDefault()).toInstant()));
        UserModel response = userService.saveUser(model);

        return UserDTO.of(response);
    }

//    @PostMapping("/login")
//    public TokenDTO login(HttpServletRequest request, HttpServletResponse response) throws IOException{
//        String authorizationHeader = request.getHeader(AUTHORIZATION);
//    }





}
