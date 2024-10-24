package com.g4appdev.TES.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.g4appdev.TES.entity.InventoryEntity;
import com.g4appdev.TES.service.InventoryService;

@RestController
@RequestMapping("/tes/inventory")
public class InventoryController {
	
	@Autowired
	InventoryService iserv;
	
	@GetMapping("/print")
	public String print() {
		return "Accessed InventoryController";
	}
	
	//CREATE
	@PostMapping("/insertInventory")
	public InventoryEntity insertInventory(@RequestBody InventoryEntity inventory) {
		return iserv.insertInventory(inventory);
	}

	//READ
	@GetMapping("/getAllInventories")
	public List<InventoryEntity> getAllInventories(){
		return iserv.getAllInventories();
	}
	
	//UPDATE
	@PutMapping("/putInventoryDetails")
	public InventoryEntity putInventoryDetails(@RequestParam int inventory_id, @RequestBody InventoryEntity newInventoryDetails) {
		return iserv.putInventoryDetails(inventory_id, newInventoryDetails);
	}
	
	//DELETE
	@DeleteMapping("/deleteInventoryDetails/{inventory_id}")
	public String deleteInventory(@PathVariable int inventory_id) {
		return iserv.deleteInventory(inventory_id);
	}
}