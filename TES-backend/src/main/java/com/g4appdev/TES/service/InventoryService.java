package com.g4appdev.TES.service;

import java.util.List;
import java.util.NoSuchElementException;

import javax.naming.NameNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g4appdev.TES.entity.InventoryEntity;
import com.g4appdev.TES.repository.InventoryRepo;

@Service
public class InventoryService {
	
	@Autowired
	InventoryRepo irepo;
	
	public InventoryService() {
		super();
	}
	
	//CREATE
	public InventoryEntity insertInventory(InventoryEntity inventory) {
		return irepo.save(inventory);
	}

	//READ
	public List<InventoryEntity>getAllInventories(){
		return irepo.findAll();
	}
	
	//UPDATE
	@SuppressWarnings("finally")
	public InventoryEntity putInventoryDetails(int inventory_id, InventoryEntity newInventoryDetails) {
		InventoryEntity inventory = new InventoryEntity();
		
		try {
			//search
			inventory = irepo.findById(inventory_id).get();
			
			//assuming that the user is allowed to edit all of these details below
			//if ID is found then the user can set the new values to all fields
			inventory.setStock_quantity(newInventoryDetails.getStock_quantity());
			inventory.setRestock_date(newInventoryDetails.getRestock_date());
			inventory.setSupplier(newInventoryDetails.getSupplier());
		}catch(NoSuchElementException nex) {
			throw new NameNotFoundException("Inventory " + inventory_id + "not found.");
		}finally {
			return irepo.save(inventory);
		}
	}
	
	//DELETE
	public String deleteInventory(int inventory_id) {
		String msg = "";
		if(irepo.findById(inventory_id)!=null) {
			irepo.deleteById(inventory_id);
			msg = "Successfully deleted!";
		}else
			msg = inventory_id + "NOT FOUND!";
		return msg;
	}

}

