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
            <div class="col-sm-6 col-12">
              <pre class="mb-5">Global Message Services Ukraine LLC
                Bundesstrasse 5 | 3rd Floor
                6300 Zug
                Switzerland
              </pre>
              <a href="tel:+41415446200">+41 41 544 62 00</a>
            </div>
            <div class="details__contacts col-sm-6 col-12">
              <p>Email</p>
              <a href="mailto:info@gms-worldwide.com">info@gms-worldwide.com</a>
              <p>Send message</p>
              <a href="viber://add?number=%2B41415446200">VIBER US</a>
              <p>Email</p>
              <a href="mailto:info@gms-worldwide.com">info@gms-worldwide.com</a>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-12">
          <h2 class="details__subtitle">
            Technical support <span>24/7</span>
          </h2>
          <div class="row">
            <div class="col-12">
              <p class="mb-5">
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
          <transition name="fade" mode="out-in">
            <div class="offices__details" :key="active">
              <div class="offices__title">{{ activeOffice.title }}</div>
              <div class="offices__address">{{ activeOffice.address }}</div>
            </div>
          </transition>
        </div>
        <div class="col-md-6 col-12 p-0">
          <GmapMap
            ref="map"
            :zoom="7"
            :center="{ lat: 1.38, lng: 103.80 }"
            style="width: 100%; height: 100%;"
            v-bind:options="mapOptions">
            <GmapMarker
              :clickable="true"
              :draggable="true"
            />
          </GmapMap>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import MapStyles from './googleMapStyle.json';

export default {
  data() {
    return {
      active: 0,
      offices: [
        {
          city: 'Kyiv',
          title: 'Global Message Services Ukraine LLC',
          address: 'Kuiv, Stepan Bandera, 33\r\n02066\r\nUkraine',
          lat: 1.38,
          lng: 103.80,
        },
        {
          city: 'New York',
          title: 'Global Message Services USA LLC',
          address: 'New York, Stepan Bandera, 32\r\n02066\r\nUSA',
          lat: 1.38,
          lng: 103.80,
        },
        {
          city: 'Guangzhou',
          title: 'Global Message Services China LLC',
          address: 'Guangzhou, Stepan Bandera, 31\r\n02066\r\nChina',
          lat: 1.38,
          lng: 103.80,
        },
        {
          city: 'Barcelona',
          title: 'Global Message Services Spain LLC',
          address: 'Barcelona, Stepan Bandera, 30\r\n02066\r\nSpain',
          lat: 1.38,
          lng: 103.80,
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
    };
  },
  computed: {
    activeOffice() {
      return this.offices[this.active];
    },
  },
  methods: {
    showTab(index) {
      this.active = index;
    },
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
