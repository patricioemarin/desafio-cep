
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
  declare _msg_id          int(10);
  declare _msg_txt         varchar(255);
    
  declare continue handler for not found set _encontrou = 1; 
    
  declare continue handler for sqlexception set _erro_tran = 1;  
  
  -- Inicia a Transação
  start transaction; 
  
  -- Armazena o parâmetro na variável auxiliar
  set _cepAux = pv_cepId;

  -- Inicializa a variável
  set _intCont = 1;
  
  -- Realiza 3 tentativas de localização do endereço pelo CEP
  cep_loop: loop
    
    -- Se não encontrou o CEP, faz 3 tentativas de substituição do dígito à direita por zero
    if exists (select cepId from tbcep where cepId = _cepAux) then
      select  cepId,  cepUF,  cepCidade,  cepBairro,  cepLogradouro,  cepComplemento 
        into _cepId, _cepUF, _cepCidade, _cepBairro, _cepLogradouro, _cepComplemento
        from tbcep 
       where cepId = _cepAux;
       leave cep_loop;
    else
      set _cepAux = rpad(mid(pv_cepId, 1, (length(pv_cepId) - _intCont)), 8, '0');
      set _intCont = (_intCont + 1);
    end if;
    
  end loop cep_loop;
  
  if (_erro_tran = 1) then
     rollback; 
     set _msg_id   = 500;
	   set _msg_txt  = 'Erro interno de banco de dados';
  else
     commit; 
     set _msg_id   = 200;
     set _msg_txt  = 'Endereço encontrado';
  end if; 
  
  -- retorna para aplicacao
  select _msg_id, _msg_txt, _cepId, _cepUF, _cepCidade, _cepBairro, _cepLogradouro, _cepComplemento;

end $$

delimiter ;