package com.EFP.EFP_Video_Dashboard_Backend.dao;

import com.EFP.EFP_Video_Dashboard_Backend.models.NavigationLinkModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NavigationRepositiory extends JpaRepository<NavigationLinkModel, Integer> {
    @Query( value = "SELECT * FROM navigation_links ORDER BY id", nativeQuery = true  )
    List<NavigationLinkModel> byName();

    @Query( value = "SELECT * FROM navigation_links where display_name = :pDisplay_name ORDER BY id", nativeQuery = true  )
    NavigationLinkModel findNavigationLinkModelByDisplayName(@Param("pDisplay_name") String pDisplay_name);

    List<NavigationLinkModel> findNavigationLinkModelByObjectId(int objectId);
}
