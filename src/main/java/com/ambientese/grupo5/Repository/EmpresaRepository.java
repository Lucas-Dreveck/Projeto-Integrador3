    package com.ambientese.grupo5.Repository;

    import org.springframework.data.jpa.repository.JpaRepository;
    import com.ambientese.grupo5.Model.EmpresaModel;

    public interface EmpresaRepository extends JpaRepository<EmpresaModel, Long> {
        boolean existsByCnpj(String cnpj);
    }
