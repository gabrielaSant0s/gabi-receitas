package com.receitas.gabi.controller

import com.receitas.gabi.dto.ReceitaRequestTO
import com.receitas.gabi.model.ReceitaModel
import com.receitas.gabi.service.ReceitaService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/receitas")
class ReceitaController(
    val service: ReceitaService
)
{
    @PostMapping
    fun salvar(
        @RequestBody receita: ReceitaRequestTO
    ) : ResponseEntity<ReceitaModel> {
        val salvo = service.salvar(receita)
        return ResponseEntity.ok(salvo)
    }

    @PutMapping
    fun editar(
        @RequestParam id : Long,
        @RequestBody receita: ReceitaRequestTO
    ): ResponseEntity<ReceitaModel>  {
        service.editar(id, receita)
        return ResponseEntity.noContent().build()
    }

    @DeleteMapping
    fun excluir(
        @RequestParam id : Long
    ) : ResponseEntity<ReceitaModel>{
        service.excluir(id)
        return ResponseEntity.noContent().build()
    }

    @GetMapping("/listar")
    fun listarTodasReceitas(): List<ReceitaModel>{
        return service.listarTodasReceitas()
    }

    @GetMapping("/listar/{id}")
    fun pegarReceita(
        @PathVariable id: Long
    ): ReceitaModel? {
        return service.pegarReceita(id)
    }
}