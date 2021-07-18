
delimiter $$

drop procedure if exists `sp_delete_usuario` $$

create procedure `sp_delete_usuario` (in pi_usuId int(11)) 
begin

  declare _encontrou smallint;
  declare _erro_tran smallint;
  declare _msg_id    int;
    
  declare continue handler for not found set _encontrou = 1; 
    
  declare continue handler for sqlexception set _erro_tran = 1;  
  
  -- Inicia a Transação
  start transaction; 
  
  if exists (select usuId from tbusuario where usuId = pi_usuId) then
    delete from tbusuario where usuId = pi_usuId;
  else 
    set _erro_tran = 2;
  end if;

  if (_erro_tran = 1) then
    rollback; 
    set _msg_id = 500;
  else
    if (_erro_tran = 2) then
      set _msg_id = 404;
    else
      commit; 
      set _msg_id = 200;
    end if;
  end if; 
  
  -- retorna para aplicacao
  select _msg_id as response;

end $$

delimiter ;