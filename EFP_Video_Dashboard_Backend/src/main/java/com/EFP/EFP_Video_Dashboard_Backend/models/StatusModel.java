package com.EFP.EFP_Video_Dashboard_Backend.models;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "status")
@Getter
@Setter
@ToString
@Data
public class StatusModel {

    @Column(name = "id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "status")
    private String status;

}
