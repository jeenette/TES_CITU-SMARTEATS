package com.g4appdev.TES.repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.g4appdev.TES.entity.OrderEntity;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
    
    List<OrderEntity> findByOrderDate(LocalDate orderDate);
    
    List<OrderEntity> findByOrderTime(LocalTime orderTime);
    
    List<OrderEntity> findByTotalAmountGreaterThan(float amount);
    
    List<OrderEntity> findByOrderDateAndOrderTime(LocalDate orderDate, LocalTime orderTime);
}
