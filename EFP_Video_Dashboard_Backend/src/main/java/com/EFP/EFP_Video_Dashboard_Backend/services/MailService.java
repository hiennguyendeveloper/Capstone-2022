package com.EFP.EFP_Video_Dashboard_Backend.services;

import com.EFP.EFP_Video_Dashboard_Backend.models.VerificationTokenModel;
import com.EFP.EFP_Video_Dashboard_Backend.dao.UserRepository;
import com.EFP.EFP_Video_Dashboard_Backend.dao.VerificationTokenRepository;
import com.EFP.EFP_Video_Dashboard_Backend.dto.UserDTO;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.sendgrid.*;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Email;
import com.sendgrid.helpers.mail.objects.Personalization;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;

@Service
@Slf4j
public class MailService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VerificationTokenRepository verificationTokenRepository;



//    public String sendTextEmail(String sendTo) throws IOException {
//        // the sender email should be the same as we used to Create a Single Sender Verification
//        Email from = new Email("do-not-reply@escapefrompoverty.org");
//        String subject = "Confirm Email";
//        Email to = new Email(sendTo);
//        Content content = new Content("text/plain", "This is a test email");
//        Mail mail = new Mail(from, subject, to, content);
//
//
//
//        SendGrid sg = new SendGrid("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");
//        Request request = new Request();
//
//        try {
//            request.setMethod(Method.POST);
//            request.setEndpoint("mail/send");
//            request.setBody(mail.build());
//            Response response = sg.api(request);
//            log.info(response.getBody());
//            return response.getBody();
//        } catch (IOException ex) {
//            throw ex;
//        }
//    }


    public String buildValidationURL(UserDTO user){
        // get user
        val model = userRepository.getById(user.getId());
        //get verification token
        val kk = new VerificationTokenModel();

        Algorithm algorithm = Algorithm.HMAC256("someSecret");
        String token = JWT.create()
                .withSubject(model.getEmail())
                //30 minutes
                .withExpiresAt(new Date(System.currentTimeMillis()+ 30*60*1000))
                .sign(algorithm);

        kk.setId(Integer.MIN_VALUE);
        kk.setToken(token);
        kk.setUser(model);
        kk.setDateExpires(LocalDateTime.now().plusHours(24L));

        verificationTokenRepository.save(kk);

        return token;
    }


    public String sendConfirmationEmail(String sendTo, String first_name, String token) throws IOException {
        /*
         * The sender email should be the same as we used to Create a Single Sender
         * Verification
         */
        Email from = new Email("do-not-reply@escapefrompoverty.org");
        Email to = new Email(sendTo);
        Mail mail = new Mail();
        Personalization personalization = new Personalization();
        personalization.addTo(to);
        mail.setFrom(from);
        mail.setSubject("Confirmation Email");
        // this is the dynamic value of first_name variable on our template
        personalization.addDynamicTemplateData("first_name", first_name);
        personalization.addDynamicTemplateData("verify_link",token);
        personalization.addDynamicTemplateData("support_link","mailto:support@escapefrompoverty.org");
        mail.addPersonalization(personalization);
        mail.setTemplateId("d-38eb744c8727485a9297425c1227ceb1");
        // feel free to save this varible on the env
        SendGrid sg = new SendGrid("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");
        Request request = new Request();

        request.setMethod(Method.POST);
        request.setEndpoint("mail/send");
        request.setBody(mail.build());
        Response response = sg.api(request);
        log.info("This is the response body of the email: "+ response.getBody());
        return response.getBody();
    }

    public String sendForgotPasswordEmail(String sendTo, String first_name, String token) throws IOException {
        /*
         * The sender email should be the same as we used to Create a Single Sender
         * Verification
         */
        Email from = new Email("do-not-reply@escapefrompoverty.org");
        Email to = new Email(sendTo);
        Mail mail = new Mail();
        Personalization personalization = new Personalization();
        personalization.addTo(to);
        mail.setFrom(from);
        mail.setSubject("Confirmation Email");
        // this is the dynamic value of first_name variable on our template
        personalization.addDynamicTemplateData("first_name", first_name);
        personalization.addDynamicTemplateData("verify_link",token);
        personalization.addDynamicTemplateData("support_link","mailto:support@escapefrompoverty.org");
        mail.addPersonalization(personalization);
        mail.setTemplateId("d-38eb744c8727485a9297425c1227ceb1");
        // feel free to save this varible on the env
        SendGrid sg = new SendGrid("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");
        Request request = new Request();

        request.setMethod(Method.POST);
        request.setEndpoint("mail/send");
        request.setBody(mail.build());
        Response response = sg.api(request);
        log.info(response.getBody());
        return response.getBody();
    }

}
