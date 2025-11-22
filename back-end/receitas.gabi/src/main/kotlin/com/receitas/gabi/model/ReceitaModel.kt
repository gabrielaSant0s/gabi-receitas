package com.receitas.gabi.model

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table

@Entity
@Table(name = "receita")
data class ReceitaModel(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    var nome: String,

    var ingredientes: String,

    @Column(name = "modo_preparo")
    var modoPreparo: String
)

