import { NumbersCollection } from "./numbersCollection";
import { Sorter } from "./sorter";
import { CharacterCollection } from "./charCollection";
import { LinkedList } from "./linkedList";


const numbersCollection = new NumbersCollection([1000000,-1,2,55,91,30,9,45])

numbersCollection.sort()
console.log(numbersCollection.data);

 
const characterCollection = new CharacterCollection('abanoub')
characterCollection.sort()
console.log(characterCollection.data);
 

const linkedList = new LinkedList()
linkedList.add(511)
linkedList.add(11)
linkedList.add(1)
linkedList.add(-41)
linkedList.add(55454)


linkedList.sort()
linkedList.print()