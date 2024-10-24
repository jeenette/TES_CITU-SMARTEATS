package com.g4appdev.TES.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;


import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;


@Entity
public class InventoryEntity {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int inventory_id;
	
	private int stock_quantity;
	private String restock_date;
	private String supplier;
	
	public InventoryEntity() {
		super();
		// TODO Auto-generated constructor stub
	}

	public InventoryEntity(int inventory_id, int stock_quantity, String restock_date, String supplier) {
		super();
		this.inventory_id = inventory_id;
		this.stock_quantity = stock_quantity;
		this.restock_date = restock_date;
		this.supplier = supplier;
	}
	
	@OneToMany(mappedBy = "inventory", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JsonBackReference
	private List<MenuitemEntity> menuitem;


	public int getInventory_id() {
		return inventory_id;
	}

	public void setInventory_id(int inventory_id) {
		this.inventory_id = inventory_id;
	}

	public int getStock_quantity() {
		return stock_quantity;
	}

	public void setStock_quantity(int stock_quantity) {
		this.stock_quantity = stock_quantity;
	}

	public String getRestock_date() {
		return restock_date;
	}

	public void setRestock_date(String restock_date) {
		this.restock_date = restock_date;
	}

	public String getSupplier() {
		return supplier;
	}

	public void setSupplier(String supplier) {
		this.supplier = supplier;
	}
	
	
	
	
	
}
