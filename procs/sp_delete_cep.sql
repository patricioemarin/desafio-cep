
delimiter $$

drop procedure if exists `sp_delete_cep` $$

create procedure `sp_delete_cep` (in pv_cepId varchar(08)) 
begin
  
  declare _encontrou smallint;
  declare _erro_tran smallint;
  declare _msg_id    int;
  declare _msg_text  varchar(80);

  declare continue handler for not found set _encontrou = 1; 
    
  declare continue handler for sqlexception set _erro_tran = 1;  
  
  -- Inicia a Transação
  start transaction; 
  
  if exists (select cepId from tbcep where cepId = pv_cepId) then
    delete from tbcep where cepId = pv_cepId;
  else 
    set _erro_tran = 2;
  end if;
  
  if (_erro_tran = 1) then
    rollback; 
    set _msg_id     = 500;
    set _msg_text   = "Erro interno do banco de dados";
  else
    if (_erro_tran = 2) then
      set _msg_id   = 404;
      set _msg_text = "CEP não localizado";
    else
      commit; 
      set _msg_id   = 200;
      set _msg_text = "CEP excluído com sucesso";
    end if;
  end if; 
  
  -- retorna para aplicacao
  select _msg_id as resId, _msg_text as resMsg;
  
end $$

delimiter ;