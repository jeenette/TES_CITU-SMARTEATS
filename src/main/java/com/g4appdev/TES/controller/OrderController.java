package com.g4appdev.TES.controller;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.g4appdev.TES.entity.OrderEntity;
import com.g4appdev.TES.service.OrderService;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    // Test endpoint
    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Hello, Orders!");
    }

    // Create an Order
    @PostMapping("/create")
    public ResponseEntity<OrderEntity> createOrder(@Validated @RequestBody OrderEntity order) {
        OrderEntity savedOrder = orderService.saveOrder(order);
        return new ResponseEntity<>(savedOrder, HttpStatus.CREATED);
    }

    // Update an existing Order
    @PutMapping("/update/{id}")
    public ResponseEntity<OrderEntity> updateOrder(@PathVariable long id, @Validated @RequestBody OrderEntity orderDetails) {
        try {
            OrderEntity updatedOrder = orderService.updateOrder(id, orderDetails);
            return ResponseEntity.ok(updatedOrder);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // Get an Order by ID
    @GetMapping("/{id}")
    public ResponseEntity<OrderEntity> getOrderById(@PathVariable long id) {
        return orderService.getOrderById(id)
                .map(order -> ResponseEntity.ok(order))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    // Get all Orders
    @GetMapping("/getAll")
    public ResponseEntity<List<OrderEntity>> getAllOrders() {
        List<OrderEntity> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }

    // Delete an Order by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteOrder(@PathVariable long id) {
        try {
            orderService.deleteOrder(id);
            return ResponseEntity.ok("Order successfully deleted");
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order not found");
        }
    }
}
