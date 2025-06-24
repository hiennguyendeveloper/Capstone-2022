package com.EFP.EFP_Video_Dashboard_Backend.controller;


import com.EFP.EFP_Video_Dashboard_Backend.dao.NavigationRepositiory;
import com.EFP.EFP_Video_Dashboard_Backend.dao.SectionRepository;
import com.EFP.EFP_Video_Dashboard_Backend.dto.NavigationDTO;
import com.EFP.EFP_Video_Dashboard_Backend.services.NavigationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/nav")
@Slf4j
@RequiredArgsConstructor
public class NavigationController {

    @Autowired
    private NavigationRepositiory navigationRepositiory;

    @Autowired
    private NavigationService navigationService;

    @Autowired
    private SectionRepository sectionRepository;



    public String createURL(String link){
        link = link.replace(" ","");
        link = link.toLowerCase(Locale.ROOT);
        return link;
    }

    @GetMapping("/populate")
    public void popNavLinks() throws Exception {
       navigationService.PopulateNavLinks();
    }


    @GetMapping("/getNavLinks")
    public List<NavigationDTO> getNavLinks() {
        return navigationRepositiory.findAll().stream().map(NavigationDTO::of).collect(Collectors.toList());
    }

}
