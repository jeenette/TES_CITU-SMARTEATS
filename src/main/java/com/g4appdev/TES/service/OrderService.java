package com.g4appdev.TES.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g4appdev.TES.entity.OrderEntity;
import com.g4appdev.TES.repository.OrderRepository;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public OrderEntity saveOrder(OrderEntity order) {
        return orderRepository.save(order);
    }

    public Optional<OrderEntity> getOrderById(long orderId) {
        return orderRepository.findById(orderId);
    }

    public List<OrderEntity> getAllOrders() {
        return orderRepository.findAll();
    }

    public OrderEntity updateOrder(long orderId, OrderEntity orderDetails) {
        OrderEntity existingOrder = orderRepository.findById(orderId)
                .orElseThrow(() -> new NoSuchElementException("Order not found with id " + orderId));

        existingOrder.setOrderDate(orderDetails.getOrderDate());
        existingOrder.setOrderTime(orderDetails.getOrderTime());
        existingOrder.setTotalAmount(orderDetails.getTotalAmount());

        return orderRepository.save(existingOrder);
    }

    public void deleteOrder(long orderId) {
        if (!orderRepository.existsById(orderId)) {
            throw new NoSuchElementException("Order not found with id " + orderId);
        }
        orderRepository.deleteById(orderId);
    }
}
