package com.EFP.EFP_Video_Dashboard_Backend.dao;

import com.EFP.EFP_Video_Dashboard_Backend.models.VerificationTokenModel;
import com.EFP.EFP_Video_Dashboard_Backend.models.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VerificationTokenRepository extends JpaRepository<VerificationTokenModel,Integer> {
    VerificationTokenModel getVerificationTokenModelByUser(UserModel user);
}
