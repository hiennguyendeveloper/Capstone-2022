package com.EFP.EFP_Video_Dashboard_Backend.dao;

import com.EFP.EFP_Video_Dashboard_Backend.models.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<UserModel,Integer> {
    UserModel findByEmail(String email);

    List<UserModel> getAllByDtmDeletedIsNullOrderByFirstName();

    List<UserModel> getAllByDtmDeletedIsNotNullOrderByDtmDeletedDesc();

    List<UserModel> findAllByDtmDeletedIsNotNullOrderByDtmDeletedDesc();


}


