package com.EFP.EFP_Video_Dashboard_Backend.controller;

import com.EFP.EFP_Video_Dashboard_Backend.dao.RoleRepository;
import com.EFP.EFP_Video_Dashboard_Backend.dao.UserRepository;
import com.EFP.EFP_Video_Dashboard_Backend.dto.UserDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/admin")
@Slf4j
@RequiredArgsConstructor
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @GetMapping("UserDetails/{id}")
    public Optional<UserDTO> getDetails(@PathVariable("id") final int id){
        log.warn("AdminController -- get_details -- {}",id);
        return userRepository.findById(id).map(UserDTO::of);
    }

    @PutMapping("UserDetails/{id}")
    public boolean getDetails(@RequestBody final UserDTO pDTO){
        log.warn("AdminController -- puy_details -- {}",pDTO);
        try {
            val role = roleRepository.getById(pDTO.getRole().getId());
            val user = userRepository.getById(pDTO.getId());
            user.setFirstName(pDTO.getFirst_name());
            user.setLastName(pDTO.getLast_name());
            user.setEmail(pDTO.getEmail());
            user.setUserRole(role);
            user.setUserPicture(pDTO.getPicture());
            userRepository.saveAndFlush(user);
            return true;
        }
        catch (Exception e){
            return false;
        }
    }

}
