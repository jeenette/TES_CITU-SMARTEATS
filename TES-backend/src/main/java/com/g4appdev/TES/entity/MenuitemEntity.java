package com.g4appdev.TES.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
//import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;



@Entity
public class MenuitemEntity {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int menu_id;
	

	private String item_name;
	private double price;
	private String category;
	private String status;
	private String image_url;
	
	
	@ManyToOne(cascade = CascadeType.MERGE)
	@JoinColumn(name = "inventoryid")
	@JsonBackReference
	private InventoryEntity inventory;


	public MenuitemEntity() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	
	public MenuitemEntity(int menu_id, String item_name, double price, String category, String status) {
		super();
		this.menu_id = menu_id;
		this.item_name = item_name;
		this.price = price;
		this.category = category;
		this.status = status;
	}
	public int getMenu_id() {
		return menu_id;
	}
	public void setMenu_id(int menu_id) {
		this.menu_id = menu_id;
	}
	public String getItem_name() {
		return item_name;
	}
	public void setItem_name(String item_name) {
		this.item_name = item_name;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}



	public String getImage_url() {
		return image_url;
	}



	public void setImage_url(String image_url) {
		this.image_url = image_url;
	}



	public InventoryEntity getInventory() {
		return inventory;
	}



	public void setInventory(InventoryEntity inventory) {
		this.inventory = inventory;
	}
	
	
}
