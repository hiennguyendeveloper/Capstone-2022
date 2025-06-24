package com.EFP.EFP_Video_Dashboard_Backend.services;


import com.EFP.EFP_Video_Dashboard_Backend.dao.NavigationLinkTypeRepository;
import com.EFP.EFP_Video_Dashboard_Backend.dao.NavigationRepositiory;
import com.EFP.EFP_Video_Dashboard_Backend.dao.SectionRepository;
import com.EFP.EFP_Video_Dashboard_Backend.models.NavigationLinkModel;
import com.EFP.EFP_Video_Dashboard_Backend.models.NavigationLinkTypeModel;
import com.EFP.EFP_Video_Dashboard_Backend.models.SectionModel;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@Service
@Slf4j
public class NavigationService {

    @Autowired
    private SectionRepository sectionRepository;

    @Autowired
    private NavigationRepositiory navigationRepositiory;

    @Autowired
    private NavigationLinkTypeRepository navigationLinkTypeRepository;


    //Create navigation such that section show if the number of mods > 2
    public boolean PopulateNavLinks() {
        try {
            //delete all nav links
            navigationRepositiory.deleteAll();
            //create empty list for final parse and creation
            List<NavigationLinkModel> navLinksTypes = new ArrayList<>();
            // iteration tracker

            ParseSections(navLinksTypes);
            return true;
        }
        catch (Exception e){
            return false;
        }

    }

    public void ParseSections(List<NavigationLinkModel> navLinksTypes){
        //
        int x = 0;
        //Get all sections
        val sections = sectionRepository.NotDeleted();
        //iterate though sections
        for (final SectionModel current : sections) {
            //get a nav link if it exists
            NavigationLinkModel pLink = navigationRepositiory.findNavigationLinkModelByDisplayName(current.getSectionName());

            if (pLink == null || pLink.getLinkType() == null || pLink.getClassName() == null) {

                pLink = Create_NavigationLinkModel_Section(current, x);
                navLinksTypes.add(pLink);

            }


            x++;

        }
    }

    public NavigationLinkModel Create_NavigationLinkModel_Section(SectionModel current, int x){
        NavigationLinkTypeModel pLinkType = navigationLinkTypeRepository.getById(0);
        val _newPLink = new NavigationLinkModel();
        _newPLink.setId(Integer.MIN_VALUE);
        log.warn(current.getSectionName());
        _newPLink.setUrl("/"+createURL(current.getSectionName())+"/"+x);
        _newPLink.setClassName(createURL(current.getSectionName()));
        _newPLink.setLinkType(pLinkType);
        _newPLink.setDisplayName(current.getSectionName());
        _newPLink.setObjectId(current.getId());
        return navigationRepositiory.save(_newPLink);
    }

    public String createURL(String link){
        link = link.replace(" ","");
        link = link.toLowerCase(Locale.ROOT);
        return link;
    }

}
