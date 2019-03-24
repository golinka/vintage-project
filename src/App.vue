<template>
  <main id="app">
    <section class="details section-container">
      <div class="row">
        <div class="col-12">
          <h1 class="">Contacts</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6 col-12">
          <h2 class="details__subtitle">
            <span>GMS</span> Headquarters
          </h2>
          <div class="row">
            <div class="col-lg-6 col-12 mb-4">
              <pre class="mb-3 mb-lg-5">Global Message Services Ukraine LLC
                Bundesstrasse 5 | 3rd Floor
                6300 Zug
                Switzerland
              </pre>
              <a href="tel:+41415446200">+41 41 544 62 00</a>
            </div>
            <div class="details__contacts col-lg-6 col-12">
              <p>Email</p>
              <a href="mailto:info@gms-worldwide.com">info@gms-worldwide.com</a>
              <p>Send message</p>
              <a href="viber://add?number=%2B41415446200">VIBER US</a>
              <p>Send form</p>
              <a href="#contactus" @click.prevent="scrollTo('contactus')">Contact Us</a>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-12 mt-5 mt-sm-0">
          <h2 class="details__subtitle">
            Technical support <span>24/7</span>
          </h2>
          <div class="row">
            <div class="col-12">
              <p class="mb-3 mb-lg-5">
                GMS understands that it can be hard to follow all new technologies.
                We regularly provide for all our clients educational trainings
                to make your operator`s business earn more and better though our
                best practices.
              </p>
              <a href="tel:+41415446206">+41 41 544 62 06</a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="offices container-fluid">
      <div class="row">
        <div class="offices__block col-md-6 col-12">
          <h2>Our Offices</h2>
          <ul class="offices__links">
            <li
              :key="index"
              v-for="(office, index) of offices"
              :class="{ active: index === active }"
              @click="showTab(index)">{{ office.city }}</li>
          </ul>
          <transition name="fade" mode="out-in" :duration="200">
            <div class="offices__details" :key="active">
              <div class="offices__title">{{ activeOffice.title }}</div>
              <div class="offices__address">{{ activeOffice.address }}</div>
            </div>
          </transition>
        </div>
        <div class="col-md-6 col-12 p-0">
          <GmapMap
            ref="map"
            :zoom="11"
            :center="activeOffice.marker"
            v-bind:options="mapOptions">
            <GmapCircle
              :radius="800"
              :center="activeOffice.marker"
              :options="{ fillColor: '#3db565', strokeColor: '#3db565', fillOpacity: 1 }"
            />
          </GmapMap>
        </div>
      </div>
    </section>
    <section class="contact section-container" ref="contactus">
      <div class="row">
        <div class="col-12">
          <h2>Contact Us</h2>
        </div>
      </div>
      <div class="row flex-sm-row-reverse">
        <div class="contact__paragraph col-md-6 col-12">
          <p>
            Please tell us more about your request and give us
            info about your company and country
          </p>
        </div>
        <div class="col-md-6 col-12 pr-sm-5 pr-3">
          <form @submit.prevent="submit">
            <InputGroup
              :rules="'required|alpha'"
              :name="'name'"
              @valueChanged="valueChanged"
              :value="form.name"/>
            <InputGroup
              :rules="'required|digits:10'"
              :name="'phone'"
              @valueChanged="valueChanged"
              :value="form.phone"/>
            <InputGroup
              :rules="'required|email'"
              :name="'email'"
              @valueChanged="valueChanged"
              :value="form.email"/>
            <label class="checkbox mt-sm-4 mb-sm-5 mt-3 mb-3">
              I agree the processing of personal data
              <input
                v-validate="'required'"
                class="checkbox__input"
                name="checkbox"
                type="checkbox"
                checked="checked">
              <span class="checkbox__checkmark"></span>
              <small
                v-if="validationError('checkbox')"
                class="error-text mt-2">{{ validationError('checkbox') }}</small>
            </label>
            <div v-if="success" class="success-text mb-4">Successfully sent!</div>
            <button
              :disabled="disableButton"
              class="btn"
              type="submit">Get in touch</button>
          </form>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import MapStyles from './googleMapStyle.json';
import InputGroup from './components/InputGroup.vue';

export default {
  data() {
    return {
      active: 0,
      offices: [
        {
          city: 'Kyiv',
          title: 'Global Message Services Ukraine LLC',
          address: 'Kuiv, Stepan Bandera, 33\r\n02066\r\nUkraine',
          marker: {
            lat: 50.4369587,
            lng: 30.5215393,
          },
        },
        {
          city: 'New York',
          title: 'Global Message Services USA LLC',
          address: 'New York, Stepan Bandera, 32\r\n02066\r\nUSA',
          marker: {
            lat: 40.6942682,
            lng: -74.0057265,
          },
        },
        {
          city: 'Guangzhou',
          title: 'Global Message Services China LLC',
          address: 'Guangzhou, Stepan Bandera, 31\r\n02066\r\nChina',
          marker: {
            lat: 23.1087651,
            lng: 113.2567812,
          },
        },
        {
          city: 'Barcelona',
          title: 'Global Message Services Spain LLC',
          address: 'Barcelona, Stepan Bandera, 30\r\n02066\r\nSpain',
          marker: {
            lat: 41.3782897,
            lng: 2.1711896,
          },
        },
      ],
      mapOptions: {
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        disableDefaultUi: false,
        styles: MapStyles,
      },
      form: {
        name: '',
        phone: '',
        email: '',
      },
      submitting: false,
      success: false,
    };
  },
  computed: {
    activeOffice() {
      return this.offices[this.active];
    },
    validationError() {
      return field => this.$validator.errors.first(field);
    },
    disableButton() {
      return !!this.errors.all().length || this.submitting;
    },
  },
  methods: {
    showTab(index) {
      this.active = index;
    },
    valueChanged({ name, value }) {
      this.form[name] = value;
    },
    scrollTo(to) {
      window.scrollTo(0, this.$refs[to].offsetTop);
    },
    successMessage() {
      this.success = true;
      setTimeout(() => {
        this.success = false;
      }, 2000);
    },
    async submit() {
      if (await this.$validator.validate()) {
        this.submitting = true;
        const response = await fetch('https://httpbin.org/post', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.form),
        });
        const { data } = await response.json();
        console.log(data);
        this.successMessage();
        this.submitting = false;
      }
    },
  },
  components: {
    InputGroup,
  },
};
</script>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
