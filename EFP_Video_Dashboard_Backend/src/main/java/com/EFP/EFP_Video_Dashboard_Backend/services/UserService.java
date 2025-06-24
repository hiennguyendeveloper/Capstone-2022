package com.EFP.EFP_Video_Dashboard_Backend.services;

import com.EFP.EFP_Video_Dashboard_Backend.dao.RoleRepository;
import com.EFP.EFP_Video_Dashboard_Backend.dao.UserRepository;
import com.EFP.EFP_Video_Dashboard_Backend.models.RoleModel;
import com.EFP.EFP_Video_Dashboard_Backend.models.UserModel;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;

@Service
@AllArgsConstructor
@NoArgsConstructor
@Slf4j
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    private PasswordEncoder passwordEncoder1;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserModel user = userRepository.findByEmail(email);
        if (user == null){
            String message =String.format("User with email: (%s) was not found",email);
            throw new UsernameNotFoundException(message);
        }
        //get the role associated to the user
        RoleModel role = roleRepository.getById(user.getUserRole().getId());
        //create a collection to pass
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        //add the role to the collection
        authorities.add(new SimpleGrantedAuthority(String.valueOf(role.getId())));

        return new org.springframework.security.core.userdetails.User(user.getEmail(),user.getUserPassword(),authorities);
    }


    public UserModel saveUser(UserModel user) {
        user.setUserPassword(passwordEncoder1.encode(user.getUserPassword()));
        return userRepository.save(user);
    }

    public RoleModel saveRole(RoleModel role) {
        return roleRepository.save(role);
    }

    public void addRoleToUser(String email, int roleID) {
        UserModel user = userRepository.findByEmail(email);
        RoleModel role = roleRepository.getById(roleID);
        //todo this might cause an error in the future
        //RoleModel role = roleRepository.findById(roleID);
        user.setUserRole(role);
    }


    public UserModel getUser(String email) {
        return userRepository.findByEmail(email);
    }

    public UserModel getById(int id){
        return userRepository.getById(id);
    }

    public void undoDeleteUser(int id){
        try{
            val user = userRepository.getById(id);
            user.setDtmDeleted(null);
            userRepository.save(user);
        }
        catch (Exception e){
            log.error("UserService -- undoDeleteUser -- could not delete user with id: {}",id);
        }

    }

    public void foreverDeleteUser(int id){
        try{
            val user = userRepository.getById(id);
            userRepository.delete(user);
        }
        catch (Exception e){
            log.error("UserService -- foreverDeleteUser -- could not forever delete user with id: {}",id);
        }

    }
}
