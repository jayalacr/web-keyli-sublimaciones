alter table temporadas
  add column fecha_inicio_mes smallint,
  add column fecha_inicio_dia smallint,
  add column fecha_fin_mes smallint,
  add column fecha_fin_dia smallint;

comment on column temporadas.fecha_inicio_mes is 'Mes (1-12) en que inicia la vigencia anual de la temporada. Null = sin restricción de fecha.';
comment on column temporadas.fecha_fin_mes is 'Mes (1-12) en que termina la vigencia anual de la temporada.';
