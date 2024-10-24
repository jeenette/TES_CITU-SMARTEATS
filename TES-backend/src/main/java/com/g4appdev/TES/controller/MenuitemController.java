package com.g4appdev.TES.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

//import com.g4appdev.TES.entity.InventoryEntity;
import com.g4appdev.TES.entity.MenuitemEntity;
import com.g4appdev.TES.service.MenuitemService;

@RestController
@RequestMapping("tes/menu")
public class MenuitemController {
	
	@Autowired
	MenuitemService mserv;
	
	@GetMapping("/item")
	public String print() {
		return "Accessed Menuitem Controller";
	}

	//create
	@PostMapping(value = "/insertMenu", consumes = "application/json")
	public MenuitemEntity insertMenu(@RequestBody MenuitemEntity menu) {
	    return mserv.insertMenu(menu);
	}
	

	//read
	@GetMapping("/getAllMenu")
	public List<MenuitemEntity> getAllMenu(){
		return mserv.getAllMenu();
	}
	
	//UPDATE
	@PutMapping("/putMenuitemDetails")
	public MenuitemEntity putMenuitemDetails(@RequestParam int menu_id, @RequestBody MenuitemEntity newMenuitemDetails) {
	    return mserv.putMenuitemDetails(menu_id, newMenuitemDetails);
	}
	
//	@PutMapping("/updateMenu/{id}")
//	public MenuitemEntity<MenuItem> updateMenuItem(@PathVariable Long id, @RequestBody MenuItem updatedItem) {
//	    // Logic to update the menu item in the database
//		return mserv.
//	}
	
	
	//Delete
	@DeleteMapping("/deleteMenuitem/{menu_id}")
	public String deleteMenuitem(@PathVariable int menu_id) {
		return mserv.deleteMenuitem(menu_id);
	}
	
	//DeleteAll
	// In MenuitemController.java
	@DeleteMapping("/deleteAllMenuItems")
	public String deleteAllMenuItems() {
	    return mserv.deleteAllMenuItems(); // Call the service method
	}


}
