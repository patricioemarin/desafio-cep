
delimiter $$

drop procedure if exists `sp_post_usuario` $$

create procedure `sp_post_usuario` (in pi_usuId int(11), 
										      in pv_usuNome varchar(120), 
                                    in pv_usuEmail varchar(60),
										      in pv_usuSenha varchar(255)) 
begin
   
   declare _encontrou smallint;
   declare _erro_tran smallint;
   declare _msg_id    int;
   declare _msg_text  varchar(80);

  declare continue handler for not found set _encontrou = 1; 
    
  declare continue handler for sqlexception set _erro_tran = 1;  
  
  -- Inicia a Transação
  start transaction; 
  
   if exists (select usuId from tbusuario where usuId = pi_usuId) then
      update tbusuario set usuNome = pv_usuNome, usuEmail = pv_usuEmail, usuSenha = pv_usuSenha 
       where usuId = pi_usuId;
   else
      insert into tbusuario (usuId, usuNome, usuEmail, usuSenha) 
                     values (pi_usuId, pv_usuNome, pv_usuEmail, pv_usuSenha); 
   end if;
  	
   if (_erro_tran = 1) then
      rollback; 
      set _msg_id    = 500;
      set _msg_text  = "Erro interno do banco de dados";
   else
      commit; 
      set _msg_id    = 200;
      set _msg_text  = "Usuário salvo com sucesso";
   end if; 
   
   -- retorna para aplicacao
   select _msg_id as resId, _msg_text as resMsg;

end $$

delimiter ;