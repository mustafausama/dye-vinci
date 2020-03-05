# Dye-Vinci

It is part of the dye-vinci project Dye-Vinci: http://dye-vinci.herokuapp.com/ Dye-vinci is a simple project to control a prototype of a textile factory.

This part is the server side of the application. It is supposed to be hosted on a server that is reachable by both the admin and the machines controlling side "dye-vinci-raspi: https://github.com/mustafausama/dye-vinci-raspi"

Once deployed, it can be accessed by both the admin in "*hostname*/manager" and any controller in "*hostname*/machine".

When it is accessed by the admin, a control UI is shown as the homepage. The elements of that UI are:
**Status**: it shows whether there is a connected machine or not
**Dye fields**: fields to enter the amounts of the water and the required color of the dye in RGB (red green blue)
**Dye colors converter**: it converts the colors from RGB to RYB (red yellow blue) which are availabe dye colors in the market.
**Components Amounts**: this shows the amount of each component, water, colorpoders, and fixative powder, to be applied to achieve the required color.
**Main Controller**: buttons and sliders that control each unit of the factory and changes the speed of operations immediately.

When it is accessed by a controller, it can receive the orders sent by the admin and by the help of "dye-vinci-raspi" project, it executes them on the corresponding units.
