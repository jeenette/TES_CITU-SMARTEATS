package com.g4appdev.TES.repository;

//import org.hibernate.mapping.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.g4appdev.TES.entity.InventoryEntity;
import com.g4appdev.TES.entity.MenuitemEntity;

@Repository
public interface MenuitemRepo extends JpaRepository<MenuitemEntity,Integer> {
	public MenuitemEntity findByCategory(String category);

	public InventoryEntity save(InventoryEntity inventory);

}
