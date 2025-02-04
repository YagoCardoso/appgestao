import { useState, useEffect } from "react";
import React, { Component, useRef } from 'react'
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {useRouter} from 'next/router'
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
  },},
}));

 

 const InsertReserva = () => {

const [getAgendamento, setAgendamento] = useState([]);
const router = useRouter();
const classes = useStyles();
const id = router.query.id;
const [titulo, setTitulo] = useState('');
const [dt_inicio, setDataInicio] = useState('');
const [dt_fim, setDataFim] = useState('');
const [idsala, setIDsala] = useState('');

console.log("id"+id)

useEffect(() => {
    axios.get(`https://localhost:44354/api/Agendamento/${id}`).then((myData) => {
const { data } = myData;
setAgendamento(data);
});
}, []);

const submitValue = () => {

  console.log(dt_fim);

  if(titulo == ''){   setTitulo(getAgendamento.titulo) }
  if(dt_inicio.length < 1){setDataInicio(getAgendamento.dT_INICIO)}
  if(dt_fim.length < 2){setDataFim(getAgendamento.dT_FIM)}
  if(idsala == ""){setIDsala(getAgendamento.idsala)}

  const frmdetails = {
    'id' : id,
    'idagendamento' : id,
    'titulo' : titulo,
    'dT_INICIO': dt_inicio,
    'dT_FIM': dt_fim,
    'idsala': idsala,
  }
   
  try {
    axios.patch(`https://localhost:44354/api/Agendamento/${id}`, frmdetails )
    .then(res => { console.log(res);  console.log(res.data);
      if(res.status == 200){ 
      alert('Alterado com sucesso');
      router.push('/TablesAgendamento');
  }
   
    })

 } catch (error) {
    // Error 😨
    if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) {
        console.log(error.request);
    } else {
        console.log('Error', error.message);
    }
    console.log(error);
 }
 }

 const cancelFunct = () => {
  router.push('/TablesAgendamento');
};


return (
<>
<div>
      <p>&nbsp; Alterar Reserva </p>
      <div>
          <DialogTitle id="form-dialog-title"> Alterar Reserva</DialogTitle>
          <DialogContent>
            <DialogContentText>
        </DialogContentText>
        <form className={classes.root}>
              <TextField  defaultValue={getAgendamento.titulo} onChange={e => setTitulo(e.target.value)}  margin="dense" helperText={`Atual: ${getAgendamento.titulo}`}  name="TITULO" label="TItulo" type="text"  variant="outlined"    />
              <TextField  defaultValue={getAgendamento.dT_INICIO} onChange={e => setDataInicio(e.target.value)}  margin="dense" helperText={`Atual: ${getAgendamento.dT_INICIO}`}  name="DT_INICIO" label="Data Inicio" type="datetime-local"  variant="outlined" className={classes.textField} InputLabelProps={{ shrink: true, }}    />
              <TextField  defaultValue={getAgendamento.dT_FIM} onChange={e => setDataFim(e.target.value)}  margin="dense" helperText={`Atual: ${getAgendamento.dT_FIM}`}  name="DT_FIM" label="Data Fim" type="datetime-local"  variant="outlined" className={classes.textField} InputLabelProps={{ shrink: true, }}    />
              <TextField  defaultValue={getAgendamento.idsala} onChange={e => setIDsala(e.target.value)}  margin="dense" helperText={`Atual Nº: ${getAgendamento.idsala}`}  name="IDSALA" label="Nº Sala" type="text"  variant="outlined"    />
               <br></br>
                <Button onClick={cancelFunct} variant="contained" color="default" color="danger">Cancelar </Button>
            <Button onClick={submitValue}
              variant="contained"
              color="primary"
              size="small"
              className={classes.button}
              startIcon={<SaveIcon />}
            >
              Salvar
      </Button>
            </form>
          </DialogContent>
      </div>
     
    </div>
</>
);
};


export default InsertReserva;