
delimiter $$

drop procedure if exists `sp_post_cep` $$

create procedure `sp_post_cep` (in pv_cepId varchar(08), 
										  in pc_cepUF char(02), 
										  in pv_cepCidade varchar(60),
										  in pv_cepBairro varchar(72), 
										  in pv_cepLogradouro varchar(72),
										  in pv_cepComplemento varchar(100)) 
begin
  
  declare _encontrou smallint;
  declare _erro_tran smallint;
  declare _msg_id    int(10);
  declare _msg_txt   varchar(255);
    
  declare continue handler for not found set _encontrou = 1; 
    
  declare continue handler for sqlexception set _erro_tran = 1;  
  
  -- Inicia a Transação
  start transaction; 
  
  if exists (select cepId from tbcep where cepId = pv_cepId) then
				   
      update tbcep set cepUF           = pc_cepUF, 
							  cepCidade		   = pv_cepCidade,
							  cepBairro       = pv_cepBairro, 
							  cepLogradouro   = pv_cepLogradouro,
                       cepComplemento  = pv_cepComplemento
					  where cepId           = pv_cepId;      
   else
			
      insert into tbcep (cepId, cepUF, cepCidade, cepBairro, cepLogradouro, cepComplemento) 
			        values (pv_cepId, pc_cepUF, pv_cepCidade, pv_cepBairro, pv_cepLogradouro, pv_cepComplemento); 
   end if;
  	
  if (_erro_tran = 1) then
     rollback; 
     set _msg_id   = 99;
	  set _msg_txt  = 'Erro interno de banco de dados';
  else
     commit; 
     set _msg_id   = 0;
     set _msg_txt  = 'Sucesso';       
  end if; 
  
  -- retorna para aplicacao
  select _msg_id, _msg_txt;

end $$

delimiter ;