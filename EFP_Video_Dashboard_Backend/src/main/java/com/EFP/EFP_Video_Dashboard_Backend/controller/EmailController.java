package com.EFP.EFP_Video_Dashboard_Backend.controller;

import com.EFP.EFP_Video_Dashboard_Backend.services.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/email")
public class EmailController {

    @Autowired
    private MailService mailService;

    @PostMapping("/send-text")
    public String send() throws IOException {
        return mailService.sendConfirmationEmail("chrisl@escapefrompoverty.org","Chris","");
    }
}
