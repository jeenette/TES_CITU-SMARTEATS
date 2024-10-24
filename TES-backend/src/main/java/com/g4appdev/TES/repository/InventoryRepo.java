package com.g4appdev.TES.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.g4appdev.TES.entity.InventoryEntity;

@Repository
public interface InventoryRepo extends JpaRepository<InventoryEntity, Integer>{
	public InventoryEntity findBySupplier(String supplier);
}
