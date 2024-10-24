package com.g4appdev.TES.service;

import java.util.List;
import java.util.NoSuchElementException;

import javax.naming.NameNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

//import com.g4appdev.TES.entity.InventoryEntity;
import com.g4appdev.TES.entity.MenuitemEntity;
import com.g4appdev.TES.repository.MenuitemRepo;

@Service
public class MenuitemService {
	
	@Autowired
	MenuitemRepo mirepo;
	
	public MenuitemService() {
		super();
	}

	//CREATE
	public MenuitemEntity insertMenu(MenuitemEntity menu) {
		return mirepo.save(menu);
	}


	//READ
	public List<MenuitemEntity>getAllMenu(){
		return mirepo.findAll();
	}
	
	//UPDATE
	@SuppressWarnings("finally")
	public MenuitemEntity putMenuitemDetails(int menu_id, MenuitemEntity newMenuitemDetails) {
		MenuitemEntity menu = new MenuitemEntity();
		
		try {
			//search
			menu = mirepo.findById(menu_id).get();
			
			menu.setItem_name(newMenuitemDetails.getItem_name());
			menu.setPrice(newMenuitemDetails.getPrice());
			menu.setCategory(newMenuitemDetails.getCategory());
			menu.setStatus(newMenuitemDetails.getStatus());
			menu.setImage_url(newMenuitemDetails.getImage_url());
		}catch(NoSuchElementException nex) {
			throw new NameNotFoundException("Menu item " + menu_id + "not found.");
		}finally {
			return mirepo.save(menu);
		}
	}

	
	//DELETE
	public String deleteMenuitem(int menu_id) {
		String messg = "";
		if(mirepo.findById(menu_id)!=null) {
			mirepo.deleteById(menu_id);
			messg = "Successfully deleted!";
		}else
			messg = menu_id + "Not Found!";
		return messg;
	}
	//DELETEALL
	// In MenuitemService.java
	public String deleteAllMenuItems() {
	    mirepo.deleteAll(); // Delete all menu items from the database
	    return "All menu items deleted successfully!";
	}

}
