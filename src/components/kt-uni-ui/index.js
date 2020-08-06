import ktPatientCard from './kt-patient-card/kt-patient-card.vue'
import ktDropdown from './kt-dropdown/kt-dropdown.vue'
import ktSearch from './kt-search/kt-search.vue'

const components = [
	ktPatientCard, 
	ktDropdown,
	ktSearch
]

const install = function(Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
}

export default {
	install,
	ktPatientCard,
	ktDropdown,
	ktSearch
}