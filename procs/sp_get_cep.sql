
delimiter $$

drop procedure if exists `sp_get_cep` $$

create procedure `sp_get_cep` (in pv_cepId varchar(08)) 

begin
  
  declare _encontrou       smallint;
  declare _erro_tran       smallint;
  declare _cepAux          varchar(08);
  declare _intCont         int(10);
  declare _cepId           varchar(08);
  declare _cepUF           char(02);
  declare _cepCidade       varchar(60);
  declare _cepBairro       varchar(80);
  declare _cepLogradouro   varchar(72);
  declare _cepComplemento  varchar(100);
  declare _msg_id          int;

  declare continue handler for not found set _encontrou = 1; 
    
  declare continue handler for sqlexception set _erro_tran = 1;  
  
  -- Inicia a Transação
  start transaction; 
  
  -- Armazena o parâmetro na variável auxiliar
  set _cepAux = pv_cepId;

  -- Inicializa a variável
  set _intCont = 1;
  
  -- Inicializa a variável de controle de erro para CEP não encontrado
  set _msg_id = 404;

  -- Realiza as tentativas de localização do endereço pelo CEP
  cep_loop: loop

    -- Se atingiu a totalidade de zeros o CEP não será encontrado e sai do looping
    if (_cepAux = "00000000") then
      leave cep_loop;
    end if;

    -- Se não encontrou o CEP, faz 3 tentativas de substituição do dígito à direita por zero
    if exists (select cepId from tbcep where cepId = _cepAux) then

      -- Carrega as informações de saída com o endereço encontrado
      select  cepId,  cepUF,  cepCidade,  cepBairro,  cepLogradouro,  cepComplemento 
        into _cepId, _cepUF, _cepCidade, _cepBairro, _cepLogradouro, _cepComplemento
        from tbcep 
       where cepId = _cepAux;
       
      -- Atualiza a mensagem em caso de sucesso
      set _msg_id = 200;

      -- Finaliza o looping
      leave cep_loop;
    else
      set _cepAux = rpad(mid(pv_cepId, 1, (length(pv_cepId) - _intCont)), 8, '0');
      set _intCont = (_intCont + 1);
    end if;
    
  end loop cep_loop;
  
  if (_erro_tran = 1) then
     set _msg_id = 500;
  end if; 
  
  -- retorna para aplicacao
  select _msg_id as response, _cepId as cep, _cepUF as uf, _cepCidade as cidade, _cepBairro as bairro, _cepLogradouro as logradouro, _cepComplemento as complemento;

end $$

delimiter ;