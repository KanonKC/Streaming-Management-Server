using System;

public class CPHInline
{

    public bool Execute()
    {
        string username = CPH.GetGlobalVar<string>("user");
        
        string primaryResult = primaryCards[random.Next(0,primaryCards.Length)];
        string secondaryResult = secondaryCards[random.Next(0,secondaryCards.Length)];

        // CPH.SendMessage("[C#] Passed");
        // CPH.SendMessage($"${username} Number: {random.Next(1,primaryCards.Length)}");
        // CPH.SendMessage($"คุณ {username} [\"ได้ไพ่หลักคือ\"] : {primaryResult} [\"ได้ไพ่รองคือ\"] : {secondaryResult}");

        // CPH.ObsSetImageSourceFile("Scence", "Test Image", "E:\\0KCE Studio\\Sony Vegas\\2Picture\\SquareDuck.png");
        // CPH.Wait(3000);
        // CPH.ObsSetImageSourceFile("Scence", "Test Image", "E:\\0KCE Studio\\Sony Vegas\\2Picture\\jesusinneed.png");
        // CPH.Wait(3000);
        // CPH.ObsSetImageSourceFile("Scence", "Test Image", "");
        
        return true;
    }
}