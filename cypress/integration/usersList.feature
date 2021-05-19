Feature: Users list page

  Scenario: Displaying the list of users
    Given I open the users list page
    Then I see the loading message
    And I see the list of users with data
      | users info  |
      | Name: First Name, Email: myemail1@email.com, Website: www.website.com    |
      | Name: Second Name, Email: myemai21@email.com, Website: www.website2.com  |
      | Name: Third Name, Email: myemail3@email.com, Website: www.website3.com   |
    And the page should not have any accessibility violations

  Scenario: Displaying the error message
    Given I open the users list page when an error occurs
    Then I see the loading message
    And I see the error message with the text "Error!"
