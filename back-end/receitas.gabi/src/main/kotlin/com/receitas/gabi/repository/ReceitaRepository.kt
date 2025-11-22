package com.receitas.gabi.repository

import com.receitas.gabi.model.ReceitaModel
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ReceitaRepository : JpaRepository<ReceitaModel, Long>