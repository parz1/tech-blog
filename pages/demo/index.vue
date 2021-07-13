<template>
  <v-container>
    <v-flex>
      <div class="mt-8 display-2 font-weight-black">parz1's DEMO</div>
      <div class="mb-9 headline font-weight-light">对技术的小实现</div>
      <v-row justify="start" align="center">
        <v-col cols="12" sm="4">
          <v-card>
            <v-card-title>Three.js demo</v-card-title>
            <v-card-text>对将Three.js封装在组件里的一次尝试</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text :to="{ path: '/demo/three-js' }">
                查看
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <blockquote class="blockquote text-center mt-8">
        &#8220;First, solve the problem. Then, write the code.&#8221;
        <footer>
          <small>
            <em>&mdash;John Johnson</em>
          </small>
        </footer>
      </blockquote>
    </v-flex>
  </v-container>
</template>
