using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using TestUnitTest;

namespace UnitTestProject1
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void Withdraw_ValidAmount_ChangesBalance()
        {
            // arrange
            double currentBalance = 10.0;
            double withdrawal = 1.0;
            double expected = 9.0;
            var account = new CheckingAccount("JohnDoe", currentBalance);
            // act
            account.Withdraw(withdrawal);
            double actual = account.Balance;
            // assert
            Assert.AreEqual(expected, actual);
        }
        [TestMethod]
        [ExpectedException(typeof(ArgumentException))]
        public void Withdraw_AmountMoreThanBalance_Throws()
        {
            // arrange
            var account = new CheckingAccount("John Doe", 0.0);
            // act
            account.Withdraw(1.0);
            // assert is handled by the ExpectedException
        }
    }
}
