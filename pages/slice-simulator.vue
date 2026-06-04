<script setup>
import { components } from "~/slices";
</script>

<template>
	<SliceSimulator #default="{ slices }">
		<SliceZone :slices="slices" :components="components" />
	</SliceSimulator>
</template>