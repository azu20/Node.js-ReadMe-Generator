function MyCoolOne(y){
    const MyVariable = 10;
    console.log(MyVariable);
    console.log(y);

    return function SecondOne(x){
        const OtherVar = 100;
        console.log(OtherVar);
        console.log(x);
        
        console.log(MyVariable);
        console.log(y);
    }
}

const ICaptureTheOutputOfTheThingIAmCallingAfterTheEquals = MyCoolOne(90);
ICaptureTheOutputOfTheThingIAmCallingAfterTheEquals(800);
