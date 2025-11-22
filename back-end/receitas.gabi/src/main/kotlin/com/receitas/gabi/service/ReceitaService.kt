package com.receitas.gabi.service

import com.receitas.gabi.dto.ReceitaRequestTO
import com.receitas.gabi.model.ReceitaModel
import com.receitas.gabi.repository.ReceitaRepository
import org.springframework.stereotype.Service

@Service
class ReceitaService(
    val repository: ReceitaRepository
) {
    fun salvar(receita: ReceitaRequestTO): ReceitaModel {
        val receitaRequest = ReceitaModel(
            nome = receita.nome,
            ingredientes = receita.ingredientes,
            modoPreparo = receita.modoPreparo
        )
        return repository.save(receitaRequest)
    }

    fun editar(id: Long, receita: ReceitaRequestTO) {
        repository.findById(id).map {
            it.nome = receita.nome
            it.ingredientes = receita.ingredientes
            it.modoPreparo = receita.modoPreparo

            repository.save(it)
        }.orElseThrow{ RuntimeException("Receita não encontrada") }
    }

    fun excluir(id: Long){
        repository.deleteById(id)
    }

    fun listarTodasReceitas() : List<ReceitaModel>{
        return repository.findAll()
    }

    fun pegarReceita(id: Long): ReceitaModel?{
        return repository.findById(id)
            .orElseThrow { RuntimeException("Receita não encontrada") }
    }
}