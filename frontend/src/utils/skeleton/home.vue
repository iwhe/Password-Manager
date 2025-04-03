<template>
  <div class="fixed w-screen h-[100px] bg-white z-[10]">
    <header
      class="relative w-[-webkit-fill-available] rounded-2xl bg-black/5 m-4 backdrop-blur-md shadow-sm flex flex-row justify-between items-center overflow-hidden"
    >
      <div class="left p-4">
        <div
          class="w-[120px] md:w-[150px] bg-black/5 h-[50px] rounded-full"
        ></div>
      </div>
      <div
        class="p-4 flex justify-between items-center gap-2"
      >
        <div
          class="md:p-4 w-[150px] h-[50px] bg-black/5 rounded-full"
        >
         
        </div>
        <div
          class="w-[50px] h-[50px] rounded-full bg-black/5"
        >
        </div>
      </div>
    </header>
  </div>

  <main
    class="flex pt-[100px] flex-col justify-center items-center relative text-md overflow-x-hidden"
  >
    <content class="flex justify-center items-center">
      <div class="p-4 w-screen lg:w-[900px] flex flex-col gap-4">
        <div class="bg-black/5 w-full h-[20px] rounded-2xl"></div>
        <div
          class="p-4 shadow-md min-h-[200px] border border-gray bg-black/5 rounded-2xl"
        >
          <div
            class="tab w-full flex flex-row justify-center gap-1 items-start"
          >
            <div
            class="w-full h-[50px] border-b border-gray flex justify-between items-center gap-4 pb-4"
            >
            <div class="w-full h-[20px] bg-black/5 rounded-2xl"></div>
            <div class="w-full h-[20px] bg-black/5 rounded-2xl"></div>
            </div>
          </div>

          <div class="w-full h-full mt-4 flex flex-col gap-4">
            <div class="w-full h-[60px] bg-black/5 rounded-2xl flex items-center p-4 gap-4 justify-between">
                <div class="w-[45px] h-[40px] rounded-full bg-black/5"></div>
                <div class="w-full h-[20px] rounded-full bg-black/5"></div>
            </div>
            <div class="w-full h-[60px] bg-black/5 rounded-2xl flex items-center p-4 gap-4 justify-between">
                <div class="w-[45px] h-[40px] rounded-full bg-black/5"></div>
                <div class="w-full h-[20px] rounded-full bg-black/5"></div>
            </div>
            <div class="w-full h-[60px] bg-black/5 rounded-2xl flex items-center p-4 gap-4 justify-between">
                <div class="w-[45px] h-[40px] rounded-full bg-black/5"></div>
                <div class="w-full h-[20px] rounded-full bg-black/5"></div>
            </div>
            
          </div>
        </div>
      </div>
    </content>
  </main>
</template>