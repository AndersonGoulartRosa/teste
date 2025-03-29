import { expect, test } from "@playwright/test";
import { auto } from "../src/auto";


const { chromium } = require('playwright');


const userAgentStrings = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.2227.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.3497.92 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
];

test("executes query", async () => {
     // Inicializa o navegador
     const browser = await chromium.launch({ headless: false }); // headless: false abre o navegador visível
     const context = await browser.newContext({
      userAgent: userAgentStrings[Math.floor(Math.random() * userAgentStrings.length)],
    });
      const page = await context.newPage();
 
     // Navega para um site
     await page.setViewportSize({ width: 1920, height: 1080 }); // ou qualquer resolução desejada

     // Mantém o navegador aberto para interação
     await page.waitForTimeout(5000); 

     await auto(`Clicar no botão 'ACESSO À CONTA`, { page, test }, options);
    //  await page.waitForTimeout(5000); 

    //  await auto(`Digitar no campo texto 'Usuário' o valor 'Anderson Teste'`, { page, test }, options);

    //  await page.waitForTimeout(1000); 

    //  await auto(`Digitar no campo texto 'Senha' o valor 'Teste'`, { page, test }, options);
    //  await page.waitForTimeout(1000); 
    //  await auto(`Selecionar no checkbox da label 'Lembrar meu acesso'`, { page, test }, options);
    //  await auto(`Clicar no botão 'Avançar'`, { page, test }, options);

    //  const textVisible = await auto(`Verificar se existe o texto 'Verifique se seu usuário e senha estão corretos e tente novamente. Se o erro persistir, confira aqui como regularizar o acesso.' na tela`, { page, test }, options)
    //  console.log("textVisible -> "+textVisible);
    //  expect(textVisible).toBe(true);
    //  await page.pause();

 
     // Fecha o navegador
  // await page.goto("/");

  // const headerText = await auto("get the header text", { page, test }, options);

  // expect(headerText).toBe("Hello, Rayrun!");
});

// test("executes query using locator_evaluate", async ({ page }) => {
//   await page.goto("/");

//   const headerText = await auto("get the first letter of the header text", {
//     page,
//     test,
//   }, options);

//   // TODO assert that we are using locator_evaluate to get the first letter
//   expect(headerText).toBe("H");
// });

// test("executes action", async ({ page }) => {
//   await page.goto("/");

//   await auto(`Type "foo" in the search box`, { page, test }, options);

//   await page.pause();

//   await expect(page.getByTestId("search-input")).toHaveValue("foo");
// });

// test("executes click", async ({ page }) => {
//   await page.goto("/");

//   await auto("Click the button until the counter value is equal to 2", {
//     page,
//     test,
//   }, options);

//   await expect(page.getByTestId("current-count")).toHaveText("2");
// });

// test("asserts (toBe)", async ({ page }) => {
//   await page.goto("/");

//   const searchInputHasHeaderText = await auto(
//     `Is the contents of the header equal to "Hello, Rayrun!"?`,
//     { page, test }, 
//     options
//   );

//   expect(searchInputHasHeaderText).toBe(true);
// });

// test("asserts (not.toBe)", async ({ page }) => {
//   await page.goto("/");

//   const searchInputHasHeaderText = await auto(
//     `Is the contents of the header equal to "Flying Donkeys"?`,
//     { page, test },
//     options
//   );

//   expect(searchInputHasHeaderText).toBe(false);
// });

// test("executes query, action and assertion", async ({ page }) => {
//   await page.goto("/");

//   const headerText = await auto("get the header text", { page, test }, options);

//   await auto(`type "${headerText}" in the search box`, { page, test }, options);

//   const searchInputHasHeaderText = await auto(
//     `is the contents of the search box equal to "${headerText}"?`,
//     { page, test }, 
//     options
//   );

//   expect(searchInputHasHeaderText).toBe(true);
// });

// test("runs without test parameter", async ({ page }) => {
//   await page.goto("/");

//   const headerText = await auto("get the header text", { page }, options);

//   expect(headerText.query).toBe("Hello, Rayrun!");
// });
