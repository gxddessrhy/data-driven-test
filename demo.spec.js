{\rtf1\ansi\ansicpg1252\cocoartf2580
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const \{ test, expect \} = require('@playwright/test');\
const testCases = require('./testCases.json');\
\
test.describe('Demo App Tests', () => \{\
\
  for (const data of testCases) \{\
\
    test(data.name, async (\{ page \}) => \{\
\
      await page.goto('https://animated-gingersnap-8cf7f2.netlify.app/');\
\
      await page.fill('input[name="username"]', 'admin');\
      await page.fill('input[name="password"]', 'password123');\
\
      await page.click('button[type="submit"]');\
\
      await page.click(`text=$\{data.board\}`);\
\
      const column = page.locator(`text=$\{data.column\}`).locator('..');\
      await expect(column).toContainText(data.task);\
\
      const taskCard = page.locator(`text=$\{data.task\}`).locator('..');\
\
      for (const tag of data.tags) \{\
        await expect(taskCard).toContainText(tag);\
      \}\
\
    \});\
\
  \}\
\
\});}