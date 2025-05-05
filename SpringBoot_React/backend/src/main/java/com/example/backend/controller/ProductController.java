package com.example.backend.controller;

import com.example.backend.entity.Product;
import com.example.backend.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping("/")
    public ResponseEntity<?> test(){
        return new ResponseEntity<>("OK", HttpStatus.OK);
    }
    //POST : http://localhost:8081/api/product:등록
    @CrossOrigin
    @PostMapping("/product")
    public ResponseEntity<?> save(@RequestBody Product product){
        return new ResponseEntity<>(productService.productSave(product),HttpStatus.CREATED);
    }
    //GET : http://localhost:8081/api/product:전체리스트 가져오기
    @CrossOrigin
    @GetMapping("/product")
    public ResponseEntity<?>findAll(){
        return new ResponseEntity<>(productService.productGetAll(),HttpStatus.OK);
    }
    //GET : http://localhost:8081/api/product/{id}   특정제품 하나만 가져오기
    @CrossOrigin
    @GetMapping("/product/{id}")
    public ResponseEntity<?>findById(@PathVariable Long id){
        return new ResponseEntity<>(productService.productGetOne(id),HttpStatus.OK);
    }

    //GET : http://localhost:8081/api/product/{id}   특정제품 하나만 삭제하기
    @CrossOrigin
    @DeleteMapping("/product/{id}")
    public ResponseEntity<?>deleteById(@PathVariable Long id){
        return new ResponseEntity<>(productService.productDelete(id),HttpStatus.OK);
    }
    //PUT : http://localhost:8081/api/product/{id}
    @CrossOrigin
    @PutMapping("/product/{id}")
    public ResponseEntity<?>update(@PathVariable Long id , @RequestBody Product product){ //@RequestBody Product product :JSON으로 넘어오는 데이터 @PathVariable Long id: URㅣ 파라미터로 넘어오는 데이터
        return new ResponseEntity<>(productService.productUpdate(id,product),HttpStatus.OK);
    }
}
