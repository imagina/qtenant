<template>    
	<div class="row justify-center align-center">
		<div class="col-12 col-sm-10 col-md-11">
			<p>
				Condiciones de uso
				Sí, quiero recibir correos electrónicos con consejos prácticos, novedades y ofertas especiales para mi página web.
			</p>
			<q-btn
				label="back"
				@click="$emit('previousStep')"
			/>
		</div>
	</div>    
  </template>
  <script>
  export default {}
  </script>