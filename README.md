# Ohm OXE(N) #
oxen is a small example of an Ohm grammar that can be used to demonstrate techniques for parsing, syntax highlighting, and reporting errors within documents that conform to a predefined structure. The structure used here is the [fictitious OTF structure](#foo), meant as a stand-in for a certain legacy text format.
  
## Overview of OTF ##
OTF stands for "Oxen Text Format," and is used by governments to track the oxen on different farms. An OTF document is made up of lines, and there are only two kinds: **owner declaration** lines and **grazing field** lines.
  
A single OTF document can describe many grazing fields belonging to many different owners. We describe each of these chunks as a **farm**. In an OTF file, a **farm** consists of a single **owner declaration** line, followed by one or more **grazing field** lines. Each "farm section" of the document can look something like this:
```otf
O:2345
1. ox OXE-ix2
2. N4<ex-xe-xi>-XA3
```
  
That probably looks a little cryptic, especially when it comes to the content of the numbered lines. So let's get into the rules for naming oxen!
  
## Oxen Names ##
All oxen on all farms are named according to a strict pattern, along with some optional modifiers.
  
At the most basic level, there are two "types" of oxen: big and little. Big oxen are denoted only using uppercase letters, and little oxen are -- as you might have guessed -- denoted using lowercase letters.
  
Any basic ox name, regardless of the big/little-ness, must *at least* conform to the following pattern, where `v` indicates a vowel and `x` indicates the literal letter x:
* `xv`
* `vx`
* `vxv`
  
For example, here are some valid Big Ox names: `XA`, `AX`, `IXI`. And here are some valid little ox names: `xo`, `ox`, `oxe`.
  
### Numeric Oxen ###
Sometimes the basic names aren't enough, and farmers have "numbered" oxen that have similar basic names. We refer to these oxen by simply adding the digits after their name -- big or small.
  
Here are some examples: `XU2`, `ixo8`, `AXE12`, etc.
  
### Family Names ###
It is common for farmers to refer to specific oxen using their lineage. A **family name** is two or more regular names -- numeric or plain -- joined using a dash `-` character. They look like this: `ox2-EXE-xi-UX-ox-xo`
  
In these cases, the specific ox has no other names to go by. It only goes by a given family name.
  
### Clinical Name Annotations ###
Farmers like to ensure that their oxen are in good health. Because of this, they have a habit of annotating ox names with an indication of the number of times a specific ox has been to the vet in the past year. The annotated name format follows this pattern: `N``digits``<``oxNAme``>`, where `oxName` is any other valid oxen name we've described so far.
  
For example, this is the name of a little ox that has been the vet 5 times: `N5<xi>`; here is the name of a big ox that has never been to the vet: `N0<AXE2>`; and here is the name of a family-named ox that has been to the vet only once ever: `N1<xu4-IX>`.
  
In a given line that describes a grazing field, OTF does not allow nested clinical annotation names. In other words, you cannot have `N4<XU3-IXI-N1<ex>>`.
  
You can, however, have multiple clinically annotated names within a grazing field line and even within a single family name: `IXI-xo4-N12<oxo2>`

  
## Grazing Field Lines ##
A single **grazing field** line is quite simple: it begins with a number, a period, at least one space, and then one or more valid Ox Names separated by spaces. For example, the following line:
  
```1. ixi-ox4 N2<EX-xo-xu2>-ix6```
  
describes the first grazing field in which there are two oxen, both with family names. The second oxen has a compound name wherein the first part of his family name is annotated with the number of times his ancestor wen t to the vet (twice, in this case).
  
Any sequence of consecutive grazing field lines *must be preceded* by a valid **owner declaration** line.
  
## Owner Declaration Lines ##
Owner declaration lines begin with an **owner declaration*, followed by any non-newline sequence of characters (which serve as custom comments, annotations, or notes that the parser doesn't care about).
  
A valid owner declaration begins with `O:`, followed by four digits used as an identifier. Here are some examples of valid owner declaration lines:
```O:1234 This is an example declaration line, with extra text```
```O:8346```
  
## Farms in OTF ##
As mentioned earlier, any sequence of an **owner declaration** line followed by one or more **grazing field** lines is considered a **farm**, and a single OTF document can contain multiple farms. A single farm in an OTF document could look something like this:
```
O:1234
1. ixi-ox4 N2<EX-xo-xu2>-ix6
2. IXI-xo4-N12<oxo2>
3. xi OX OXE exo
```
